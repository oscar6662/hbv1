package is.hi.hbv501g.hbv1.Controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Controller for auth0 logic.
 */
@Controller
public class AuthController {

    @GetMapping("/api/isauthenticated")
    public ResponseEntity<Object> home(Model model, @AuthenticationPrincipal OidcUser principal,
            HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        if (principal != null) {
            model.addAttribute("profile", principal.getClaims());
            return new ResponseEntity<>(model.getAttribute("profile"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
        }
    }

}