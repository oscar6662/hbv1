package is.hi.hbv501g.hbv1.Controllers;

import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Persistence.Entities.Parent;
import is.hi.hbv501g.hbv1.Services.ChildService;
import is.hi.hbv501g.hbv1.Services.DaycareWorkerService;
import is.hi.hbv501g.hbv1.Services.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

import java.util.List;
import java.util.Optional;

@CrossOrigin(maxAge = 3600)
@RestController
@RequestMapping("/api")
public class ParentController {
    @Autowired
    private ParentService parentService;
    @Autowired
    private ChildService childService;

    @GetMapping("/parents")
    public ResponseEntity<List<Parent>> getAllDaycareWorkers() {
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

//    @GetMapping("/daycareworkers/{id}")
//    public ResponseEntity<DaycareWorker> getDaycareWorkerByID(@PathVariable("id") String id) {
//        DaycareWorker dcw;
//        try {
//            Long idAsLong = Long.parseLong(id);
//            dcw = daycareWorkerService.findDaycareWorkerById(idAsLong);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//
//        return new ResponseEntity<>(dcw, HttpStatus.OK);
//    }

    @PostMapping("/createparent")
    public ResponseEntity<Parent> createParent(@RequestBody Parent parent) {
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

//    @PostMapping("/createchild")
//    public ResponseEntity<Child> createChild(@RequestBody Child child) {
//        Long id = Math.round(Math.ceil(Math.random() * 30));
//        Parent parent = parentService.findParentById(id);
//        child.setParent(parent);
//
//        try {
//            childService.save(child);
//
//            if (child == null) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//
//            return new ResponseEntity<>(child, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

}

