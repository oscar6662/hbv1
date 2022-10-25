package is.hi.hbv501g.hbv1.Controllers;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import is.hi.hbv501g.hbv1.Persistence.DTOs.ApplicationDTO;
import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Services.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import is.hi.hbv501g.hbv1.Persistence.Entities.Application;
import is.hi.hbv501g.hbv1.Persistence.Entities.Parent;
import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import is.hi.hbv501g.hbv1.Services.ParentService;

@RestController
@RequestMapping("/api")
public class DaycareWorkerController {
    @Autowired
    private ParentService parentService;
    @Autowired
    private DaycareWorkerService daycareWorkerService;

    @Autowired
    private ChildService childService;
//    @GetMapping("/apply/{DaycareWorkerID}")
//    public String applyForDaycareWorker(@PathVariable("DaycareWorkerID") Long daycareWorkerId,
//            @AuthenticationPrincipal OidcUser principal) throws IOException {
//        Parent parent = parentService.findParentByEmail(principal.getEmail());
//        LocalDateTime ldt = LocalDateTime.now();
//        try {
//            Application application = new Application(daycareWorkerId, parent.getId(), ldt);
//            daycareWorkerService.applyForDaycareWorker(application);
//            return "goodshit";
//        } catch (Exception e) {
//            System.out.println(e);
//            return "horseshit";
//        }
//    }

    @PostMapping("/daycareworker/apply")
    public ResponseEntity<ArrayList<Application>> applyForDaycareWorker(@RequestBody ApplicationDTO applicationDTO,
                                        @AuthenticationPrincipal OidcUser principal) throws IOException {
        DaycareWorker dcw = daycareWorkerService.findDaycareWorkerById(applicationDTO.getDaycareWorkerId());

        ArrayList<Application> arr = new ArrayList<>();
        int j = 0;
        try {
            for (Long i: applicationDTO.getChildrenId()) {
                Child c = childService.findChildById(i);

                if (c.getDaycareWorker() != null) {
                    continue;
                }

                if (dcw.getChildrenCount() >= dcw.getMAXCHILDREN()) {
                    return new ResponseEntity<>(HttpStatus.CONFLICT);
                }

                j++;

                Application appl = new Application(applicationDTO.getDaycareWorkerId(), applicationDTO.getParentId(), i);
                daycareWorkerService.applyForDaycareWorker(appl);

                c.setDaycareWorker(dcw);

                arr.add(appl);
            }

            dcw.setChildrenCount(dcw.getChildrenCount() + j);

            if (arr.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(arr, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
