package is.hi.hbv501g.hbv1.Services.Implementation;

import is.hi.hbv501g.hbv1.Persistence.Entities.Child;
import is.hi.hbv501g.hbv1.Persistence.Repositories.ChildRepository;
import is.hi.hbv501g.hbv1.Services.ChildService;
import org.springframework.stereotype.Service;

@Service
public class ChildServiceImplementation implements ChildService {
    private ChildRepository childRepository;

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
}
