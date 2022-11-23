package is.hi.hbv501g.hbv1.Security;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.lang.Nullable;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.ResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;

@EnableWebSecurity
public class SecurityConfig {

    private final LogoutHandler logoutHandler;

    public SecurityConfig(LogoutHandler logoutHandler) {
        this.logoutHandler = logoutHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();
        http.authorizeRequests()
                .mvcMatchers("/", "/api/daycareworkers", "/api/addlocation", "/api/locations", "/api/adddaycareworker",
                        "/api/isauthenticated", "/api/createparent", "/api/daycareworkerexists/{ssn}",
                        "/api/parentexists/{ssn}", "/home", "/assets/*", "")
                .permitAll() // allow all users to access the home pages and the static images directory
                .anyRequest().authenticated() // all other requests must be authenticated
                .and().oauth2Login().defaultSuccessUrl("https://hbv1-db.herokuapp.com/home")
                .and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout")) // handle logout
                .addLogoutHandler(logoutHandler); // customize logout handler to log out of
        // Auth0
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("HEAD",
                "GET", "POST", "PUT", "DELETE", "PATCH"));
        // setAllowCredentials(true) is important, otherwise:
        // The value of the 'Access-Control-Allow-Origin' header in the response must
        // not be the wildcard '*' when the request's credentials mode is 'include'.
        configuration.setAllowCredentials(true);
        // setAllowedHeaders is important! Without it, OPTIONS preflight request
        // will fail with 403 Invalid CORS request
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

@Configuration
@EnableWebMvc
class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("HEAD", "GET", "PUT", "POST", "DELETE", "PATCH");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        ResourceResolver resolver = new ReactResourceResolver();
        registry.addResourceHandler("/")
                .resourceChain(true)
                .addResolver(resolver);
        registry.addResourceHandler("/**")
                .resourceChain(true)
                .addResolver(resolver);

        // Can try to play with
        // registry.addResourceHandler("/**")
        // .addResourceLocations("classpath:/static/");
        // But this option can't map every path to index.html
        // Can try https://stackoverflow.com/a/42998817/1032167
        // to resolve this, but then you loose /api/** => rest
        // and to be honest it is some regex madness, so
        // it was easier for me to setup custom resource resolver

    }

    class ReactResourceResolver implements ResourceResolver {
        // this is the same directory you are using in package.json
        // "build-spring": "react-scripts build && mv build static && mv static
        // ../src/main/resources",
        // example REACT_DIR/index.html
        private static final String REACT_DIR = "/static/";

        // this is directory inside REACT_DIR for react static files
        // example REACT_DIR/REACT_STATIC_DIR/js/
        // example REACT_DIR/REACT_STATIC_DIR/css/
        private static final String REACT_STATIC_DIR = "assets";

        private Resource index = new ClassPathResource(REACT_DIR + "index.html");
        private List<String> rootStaticFiles = Arrays.asList("vite.svg",
                "index.js", "index.css");

        @Override
        public Resource resolveResource(HttpServletRequest request, String requestPath,
                List<? extends Resource> locations, ResourceResolverChain chain) {
            return resolve(requestPath, locations);
        }

        @Override
        public String resolveUrlPath(String resourcePath, List<? extends Resource> locations,
                ResourceResolverChain chain) {
            Resource resolvedResource = resolve(resourcePath, locations);
            if (resolvedResource == null) {
                return null;
            }
            try {
                return resolvedResource.getURL().toString();
            } catch (IOException e) {
                return resolvedResource.getFilename();
            }
        }

        private Resource resolve(String requestPath, List<? extends Resource> locations) {

            if (requestPath == null)
                return null;

            if (rootStaticFiles.contains(requestPath)
                    || requestPath.startsWith(REACT_STATIC_DIR)) {
                System.out.println(REACT_DIR + requestPath);
                return new ClassPathResource(REACT_DIR + requestPath);
            } else {
                System.out.println("ajshd");
                return index;

            }
        }

    }

}
