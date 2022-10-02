package is.hi.hbv501g.hbv1.Controllers;

import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

import java.util.List;
import java.util.Optional;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api")
public class HomeController {
    @Autowired
    private DaycareWorkerService daycareWorkerService;

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
    public ResponseEntity<List<DaycareWorker>> getAllDaycareWorkers(@RequestParam(required = false) String location) {
        try {
            List<DaycareWorker> daycareWorkers = new ArrayList<DaycareWorker>();

            if (location == null)
                daycareWorkerService.findAll().forEach(daycareWorkers::add);
            else
                daycareWorkerService.findByLocation(location).forEach(daycareWorkers::add);

            if (daycareWorkers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(daycareWorkers, HttpStatus.OK);
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

}
