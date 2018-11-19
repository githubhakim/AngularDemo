using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace MyKitchen.Web.DataAccess
{
    public  class Repo<C, T> : IRepo<T> where T : class where C : DbContext, new()
    {
        C _dbContext = null;

        public Repo()
        {
            _dbContext = new C();
            
        }

        public C DbContext {
            get { return _dbContext;  }
            set { _dbContext = value;  }
        }

       
        public virtual IQueryable<T> GetAll()
        {
            IQueryable<T> query = _dbContext.Set<T>();

            return query;
        }

        public virtual IQueryable<T> Find(Expression<Func<T, bool>> predicate)
        {
            IQueryable<T> query = _dbContext.Set<T>().Where(predicate);

            return query;
        }


        public virtual void Add(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Added;
            
        }

        public virtual void Delete(T entity)
        {    
            _dbContext.Set<T>().Remove(entity);
        }

        public virtual void Edit(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            
        }

        public virtual void Save()
        {
            _dbContext.SaveChanges();
        }
    }
}
