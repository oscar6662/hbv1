package is.hi.hbv501g.hbv1.Controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import is.hi.hbv501g.hbv1.Persistence.DTOs.ParentChildDTO;
import is.hi.hbv501g.hbv1.Persistence.DTOs.ParentDTO;
import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Persistence.Entities.Parent;
import is.hi.hbv501g.hbv1.Services.ChildService;
import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import is.hi.hbv501g.hbv1.Services.ParentService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import java.util.List;
import java.util.Optional;

/**
 * Controller for Parent logic.
 */

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class ParentController {
    @Autowired
    private ParentService parentService;
    @Autowired
    private ChildService childService;

    @Value("${spring.security.oauth2.client.registration.auth0.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.auth0.client-secret}")
    private String clientSecret;

    @Value("${TOKEN}")
    private String token;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * GET on /parents
     * 
     * @return List of all parents
     */
    @GetMapping("/parents")
    public ResponseEntity<List<Parent>> getAllParents() {
        try {
            List<Parent> parents = new ArrayList<Parent>();

            parentService.findAll().forEach(parents::add);

            if (parents.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(parents, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * GET on /parent/{auth0ID}
     * 
     * @param auth0Id the parents auth0ID
     * @return the parent
     */
    @GetMapping("/parent/{auth0id}")
    public ResponseEntity<Parent> getParentByAuth0ID(@PathVariable("auth0id") String auth0Id) {
        Parent parent;
        try {
            parent = parentService.findParentByAuth0Id(auth0Id);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(parent, HttpStatus.OK);
    }

    /**
     * GET on /daycareworkerexists/{id}
     * 
     * @param id daycareworker id
     * @return boolean
     */
    @GetMapping("/parentexists/{id}")
    public boolean parentexists(@PathVariable("id") String id) {
        boolean parent;
        try {
            Long idAsLong = Long.parseLong(id);
            System.out.println("askdj");
            parent = parentService.findBySsn(idAsLong);
            System.out.println(parent);
            if (parent) {
                return false;
            } else {
                return true;
            }
        } catch (Exception e) {
            return true;
        }
    }

    // @GetMapping("/daycareworkers/{id}")
    // public ResponseEntity<DaycareWorker> getDaycareWorkerByID(@PathVariable("id")
    // String id) {
    // DaycareWorker dcw;
    // try {
    // Long idAsLong = Long.parseLong(id);
    // dcw = daycareWorkerService.findDaycareWorkerById(idAsLong);
    // } catch (Exception e) {
    // return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
    //
    // return new ResponseEntity<>(dcw, HttpStatus.OK);
    // }

    /**
     * POST on /createparent
     * 
     * @param parentDTO data transfer object parentDTO from the request body
     * @return parent created
     * @throws IOException
     */
    @PostMapping("/createparent")
    public ResponseEntity<Parent> createParent(@RequestBody ParentDTO parentDTO) throws IOException {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        // Signup logic for auth0
        JSONObject json = new JSONObject();
        json.put("email", parentDTO.getEmail());
        json.put("password", parentDTO.getPassword());
        json.put("client_id", clientId);
        json.put("connection", "Username-Password-Authentication");

        HttpEntity<String> entity = new HttpEntity<>(json.toString(), headers);

        String result = "";
        try {
            result = restTemplate.postForObject("https://dev-xzuj3qsd.eu.auth0.com/dbconnections/signup", entity,
                    String.class);
        } catch (HttpClientErrorException err) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        JsonNode root = objectMapper.readTree(result);

        String email = root.path("email").asText();
        String id = root.path("_id").asText();
        System.out.println(id + " : " + email);

        // Here we assign the role Parent to the new account on auth0.
        // This has to be done after the user is created.

        JSONObject roleJson = new JSONObject();
        List<String> roleArray = new ArrayList<>();
        roleArray.add(parentDTO.getROLE());
        roleJson.put("roles", roleArray);

        HttpEntity<String> roleEntity = new HttpEntity<>(roleJson.toString(), headers);

        try {
            restTemplate.postForObject("https://dev-xzuj3qsd.eu.auth0.com/api/v2/users/auth0|" + id + "/roles",
                    roleEntity, String.class);
        } catch (HttpClientErrorException err) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // After all the auth0 logic we finally construct the parent and add it to out
        // Database
        Parent parent = new Parent(
                parentDTO.getSsn(),
                parentDTO.getFirstName(),
                parentDTO.getLastName(),
                parentDTO.getMobile(),
                parentDTO.getEmail(),
                id,
                null);

        try {
            parentService.save(parent);

            if (parent == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(parent, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * POST on /createchild
     * 
     * @param parentChildDTO data transfer object parentChildDTO from the request
     *                       body
     * @return the child created
     */
    @PostMapping("/createchild")
    public ResponseEntity<Child> createChild(@RequestBody ParentChildDTO parentChildDTO) {
        // Parent parent = parentService.findParentById(id);
        // child.setParent(parent);

        Parent parent = parentService.findParentById(parentChildDTO.getParentId());
        Child child = new Child(parentChildDTO.getSsn(), parentChildDTO.getFirstName(),
                parentChildDTO.getLastName());
        try {
            child.setParent(parent);
            childService.save(child);
            return new ResponseEntity<>(child, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/notifysickleave")
    public ResponseEntity<String> notifySickLeave(@RequestBody Long childId) {
        LocalDate today = LocalDate.now();

        System.out.println(childId);
        System.out.println(childId.getClass());

        try {
            Child c = childService.findChildById(childId);
            c.setSicknessDay(today);
            childService.save(c);
            return new ResponseEntity<>("Success", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
