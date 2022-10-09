package is.hi.hbv501g.hbv1.Services.Implementation;

import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Persistence.Entities.Parent;
import is.hi.hbv501g.hbv1.Persistence.Repositories.ChildRepository;
import is.hi.hbv501g.hbv1.Services.ChildService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChildServiceImplementation implements ChildService {
    private ChildRepository childRepository;

    @Autowired
    public ChildServiceImplementation(ChildRepository childRepository) {
        this.childRepository = childRepository;
    }

    @Override
    public Child save(Child child) {
        return childRepository.save(child);
    }

    @Override
    public void delete(Child child) {
        childRepository.delete(child);
    }

    @Override
    public List<Child> findByParents(Parent parent) {
        return childRepository.findByParents(parent);
    }

    @Override
    public List<Child> findByDaycareWorker(DaycareWorker daycareWorker) {
        return childRepository.findByDaycareWorker(daycareWorker);
    }
}
