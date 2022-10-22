package is.hi.hbv501g.hbv1.Services.Implementation;

import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Persistence.Entities.Parent;
import is.hi.hbv501g.hbv1.Persistence.Repositories.ChildRepository;
import is.hi.hbv501g.hbv1.Persistence.Repositories.ParentRepository;
import is.hi.hbv501g.hbv1.Services.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Service for routes that handle Parents.  It uses Parent and Child repository.
 */
@Service
public class ParentImplementation  implements ParentService {
    private ParentRepository parentRepository;
    private ChildRepository childRepository;

    @Autowired
    public ParentImplementation(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    @Override
    public List<Parent> findAll() {
        return parentRepository.findAll();
    }

    @Override
    public Parent findParentById(Long id) {
        return parentRepository.findParentById(id);
    }

    @Override
    public Parent save(Parent parent) {
        return parentRepository.save(parent);
    }

    @Override
    public void delete(Parent parent) {
        parentRepository.delete(parent);
    }

    @Override
    public Child addChild(Child child) {
        return childRepository.save(child);
    }
}
