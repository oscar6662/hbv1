package is.hi.hbv501g.hbv1.Controllers;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/apply/{DaycareWorkerID}")
    public String applyForDaycareWorker(@PathVariable("DaycareWorkerID") Long daycareWorkerId,
            @AuthenticationPrincipal OidcUser principal) throws IOException {
        Parent parent = parentService.findParentByEmail(principal.getEmail());
        LocalDateTime ldt = LocalDateTime.now();
        try {
            Application application = new Application(daycareWorkerId, parent.getId(), ldt);
            daycareWorkerService.applyForDaycareWorker(application);
            return "goodshit";
        } catch (Exception e) {
            System.out.println(e);
            return "horseshit";
        }
    }
}
