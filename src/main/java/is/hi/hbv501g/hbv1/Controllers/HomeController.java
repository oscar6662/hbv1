package is.hi.hbv501g.hbv1.Controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import is.hi.hbv501g.hbv1.Persistence.DTOs.DayReportDTO;
import is.hi.hbv501g.hbv1.Persistence.DTOs.DaycareWorkerDTO;
import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Services.ChildService;
import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class HomeController {
    @Autowired
    private DaycareWorkerService daycareWorkerService;

    @Autowired
    private ChildService childService;

    @Value("${spring.security.oauth2.client.registration.auth0.client-id}")
    private String clientId;
    @Value("${spring.security.oauth2.client.registration.auth0.client-secret}")
    private String clientSecret;

    @Value("${TOKEN}")
    private String token;

    private final ObjectMapper objectMapper = new ObjectMapper();

//    public HomeController(DaycareWorkerService daycareWorkerService) {
//        this.daycareWorkerService = daycareWorkerService;
//    }
//
//    public HomeController() {
//    }
//    public String homePage(Model model){
//
//        List<DaycareWorker> daycareWorkers = daycareWorkerService.findAll();
//        model.addAttribute("daycareworkers", daycareWorkers);
//        return "home";
//    }

    @GetMapping("/daycareworkers")
    public ResponseEntity<List<DaycareWorker>> getAllDaycareWorkers(@RequestParam(required = false) String locationCode) {
        List<DaycareWorker> daycareWorkers = new ArrayList<>();
        try {

            if (locationCode == null)
                daycareWorkerService.findAll().forEach(daycareWorkers::add);
            else
                daycareWorkerService.findByLocationCode(locationCode).forEach(daycareWorkers::add);


            if (daycareWorkers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(daycareWorkers, HttpStatus.OK);
    }

    @GetMapping("/daycareworkers/{id}")
    public ResponseEntity<DaycareWorker> getDaycareWorkerByID(@PathVariable("id") String id) {
        DaycareWorker dcw;
        try {
            Long idAsLong = Long.parseLong(id);
            dcw = daycareWorkerService.findDaycareWorkerById(idAsLong);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(dcw, HttpStatus.OK);
    }

    @PostMapping("/adddaycareworker")
    public ResponseEntity<DaycareWorker> addDaycareWorker(@RequestBody DaycareWorkerDTO daycareWorkerDTO) throws IOException {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);


        // Signup logic for auth0
        JSONObject json = new JSONObject();
        json.put("email", daycareWorkerDTO.getEmail());
        json.put("password", daycareWorkerDTO.getPassword());
        json.put("client_id", clientId);
        json.put("connection", "Username-Password-Authentication");

        HttpEntity<String> entity = new HttpEntity<>(json.toString(), headers);

        String result = "";
        try {
            result = restTemplate.postForObject("https://dev-xzuj3qsd.eu.auth0.com/dbconnections/signup", entity, String.class);
        } catch(HttpClientErrorException err) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        JsonNode root = objectMapper.readTree(result);

        String email = root.path("email").asText();
        String id = root.path("_id").asText();
        System.out.println(id + " : " + email);

        // Here we assign the role DCW to the new account on auth0.
        // This has to be done after the user is created.
        JSONObject roleJson = new JSONObject();
        List<String> roleArray = new ArrayList<>();
        roleArray.add(daycareWorkerDTO.getROLE());
        roleJson.put("roles", roleArray);

        HttpEntity<String> roleEntity = new HttpEntity<>(roleJson.toString(), headers);

        try {
            restTemplate.postForObject("https://dev-xzuj3qsd.eu.auth0.com/api/v2/users/auth0|"+id+"/roles", roleEntity, String.class);
        } catch(HttpClientErrorException err) {
            System.out.println(err);
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // After all the auth0 logic we finally construct the daycareworker and add it to out Database
        DaycareWorker daycareWorker = new DaycareWorker(
                daycareWorkerDTO.getSsn(),
                daycareWorkerDTO.getFirstName(),
                daycareWorkerDTO.getLastName(),
                daycareWorkerDTO.getMobile(),
                daycareWorkerDTO.getEmail(),
                id,
                daycareWorkerDTO.getExperienceInYears(),
                daycareWorkerDTO.getAddress(),
                daycareWorkerDTO.getLocation(),
                daycareWorkerDTO.getLocationCode()
        );

        try {
            daycareWorkerService.addDaycareWorker(daycareWorker);

            if (daycareWorker == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(daycareWorker, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/createdayreport")
    public ResponseEntity<DayReport> createDayReport(@RequestBody DayReportDTO dayReportDTO) {
        try {
            DaycareWorker dcw = daycareWorkerService.findDaycareWorkerById(dayReportDTO.getDcwId());
            Child c = childService.findChildById(dayReportDTO.getChildId());

            DayReport dayReport = new DayReport(dayReportDTO.getSleepFrom(), dayReportDTO.getSleepTo(), dayReportDTO.getAppetite(), dayReportDTO.getComment(), dcw, c);

            daycareWorkerService.createDayReport(dayReport);

            if (dayReport == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(dayReport, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    @RequestMapping(value = "/addDaycareworker", method = RequestMethod.GET)
//    public String addDaycareWorkerForm(DaycareWorker daycareWorker){
//        return "newdaycareworker";
//    }
//
//    @RequestMapping(value = "/addDaycareworker", method = RequestMethod.POST)
//    public String addDaycareWorker(DaycareWorker daycareWorker, BindingResult result, Model model){
//        if(result.hasErrors()) {
//            return "newdaycareworker";
//        }
//        daycareWorkerService.addDaycareWorker(daycareWorker);
//        return "redirect:/";
//    }
//
//    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
//    public String deleteDaycareWorker(@PathVariable("id") Long id, Model model) {
//        DaycareWorker daycareWorker = daycareWorkerService.findDaycareWorkerById(id);
//        daycareWorkerService.delete(daycareWorker);
//        return "redirect:/";
//    }
    public String create_token() {
        String input = clientId + ":" + clientSecret;
        String encoded = Base64.getEncoder().encodeToString(input.getBytes());
        byte[] decodedBytes = Base64.getDecoder().decode(encoded);
        String decodedString = new String(decodedBytes);
        return decodedString;
    }

}
