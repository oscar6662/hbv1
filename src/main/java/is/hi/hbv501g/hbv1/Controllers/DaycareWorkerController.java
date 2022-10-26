package is.hi.hbv501g.hbv1.Controllers;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import is.hi.hbv501g.hbv1.Persistence.DTOs.ApplicationDTO;
import is.hi.hbv501g.hbv1.Persistence.Entities.*;
import is.hi.hbv501g.hbv1.Services.ApplicationListService;
import is.hi.hbv501g.hbv1.Services.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import is.hi.hbv501g.hbv1.Services.ParentService;

/**
 * Controller for Daycareworker logic.
 */
@RestController
@RequestMapping("/api")
public class DaycareWorkerController {

    @Autowired
    private ParentService parentService;
    @Autowired
    private DaycareWorkerService daycareWorkerService;
    @Autowired
    private ApplicationListService applicationListService;
    @Autowired
    private ChildService childService;

    /**
     * POST on /daycareworker/apply
     * 
     * @param applicationDTO data transfer object applicationDTO from the request
     *                       body
     * @param principal      currently logged-in user
     * @return an array of application information
     * @throws IOException
     */
    @PostMapping("/daycareworker/apply")
    public ResponseEntity<Application> applyForDaycareWorker(@RequestBody ApplicationDTO applicationDTO,
            @AuthenticationPrincipal OidcUser principal) throws IOException {
        DaycareWorker dcw = daycareWorkerService.findDaycareWorkerById(applicationDTO.getDaycareWorkerId());

        try {
            LocalDateTime ldt = LocalDateTime.now();
            Child c = childService.findChildById(applicationDTO.getChildId());

            if (c.getDaycareWorker() != null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Application appl = new Application(applicationDTO.getDaycareWorkerId(), applicationDTO.getParentId(),
                    applicationDTO.getChildId(), ldt);
            if (dcw.getChildrenCount() <= dcw.getMAXCHILDREN()) {
                dcw.addChildToList(c);
                c.setDaycareWorker(dcw);
                childService.save(c);
            } else {
                daycareWorkerService.applyForDaycareWorker(appl);
            }
            daycareWorkerService.addDaycareWorker(dcw);

            if (appl == null) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(appl, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/daycareworker/applications/{id}")
    public ResponseEntity<List<Application>> getDaycareWorkersApplication(@PathVariable("id") Long id) {
        return new ResponseEntity<>(applicationListService.getApplicationList(id), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
