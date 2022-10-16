package is.hi.hbv501g.hbv1.Services;

import is.hi.hbv501g.hbv1.Persistence.Entities.*;

import java.util.List;

public interface ParentService {
    List<Parent> findAll();
    Parent findParentById(Long id);
    Parent save(Parent parent);
    void delete(Parent parent);
    Child addChild(Child child);
}
