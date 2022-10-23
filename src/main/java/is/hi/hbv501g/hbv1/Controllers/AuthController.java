package is.hi.hbv501g.hbv1.Controllers;

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

    @GetMapping("/")
    public String home(Model model, @AuthenticationPrincipal OidcUser principal, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        System.out.println(httpServletResponse.getHeaders("token"));
        if (principal != null) {
            model.addAttribute("profile", principal.getClaims());
        }
        System.out.println(model.getAttribute("profile"));
        return "index";
    }
}