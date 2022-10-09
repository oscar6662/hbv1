package is.hi.hbv501g.hbv1.Services.Implementation;

import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Entities.DayReport;
import is.hi.hbv501g.hbv1.Persistence.Entities.DaycareWorker;
import is.hi.hbv501g.hbv1.Persistence.Entities.Parent;
import is.hi.hbv501g.hbv1.Persistence.Repositories.ParentRepository;
import is.hi.hbv501g.hbv1.Services.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParentImplementation  implements ParentService {
    private ParentRepository parentRepository;

    @Autowired
    public ParentImplementation(ParentRepository parentRepository) {
        this.parentRepository = parentRepository;
    }

    @Override
    public Parent save(Parent parent) {
        return parentRepository.save(parent);
    }

    @Override
    public void delete(Parent parent) {
        parentRepository.delete(parent);
    }
}
