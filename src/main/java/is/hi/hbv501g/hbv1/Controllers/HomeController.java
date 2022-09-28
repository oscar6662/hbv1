package is.hi.hbv501g.hbv1.Controllers;

import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;
import java.util.UUID;

@Controller
public class HomeController {
    private DaycareWorkerService daycareWorkerService;

    @Autowired
    public HomeController(DaycareWorkerService daycareWorkerService) {
        this.daycareWorkerService = daycareWorkerService;
    }

    @RequestMapping("/")
    public String homePage(Model model){

        List<DaycareWorker> daycareWorkers = daycareWorkerService.findAll();
        model.addAttribute("daycareworkers", daycareWorkers);
        return "home";
    }

    @RequestMapping(value = "/addDaycareworker", method = RequestMethod.GET)
    public String addDaycareWorkerForm(DaycareWorker daycareWorker){
        return "newdaycareworker";
    }

    @RequestMapping(value = "/addDaycareworker", method = RequestMethod.POST)
    public String addDaycareWorker(DaycareWorker daycareWorker, BindingResult result, Model model){
        if(result.hasErrors()) {
            return "newdaycareworker";
        }
        daycareWorkerService.addDaycareWorker(daycareWorker);
        return "redirect:/";
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public String deleteDaycareWorker(@PathVariable("id") UUID id, Model model) {
        DaycareWorker daycareWorker = daycareWorkerService.findById(id);
        daycareWorkerService.delete(daycareWorker);
        return "redirect:/";
    }

}
