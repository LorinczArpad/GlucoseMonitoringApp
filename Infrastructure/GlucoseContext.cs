using Domain.Common;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure
{
    public class GlucoseContext : DbContext
    {
        public GlucoseContext(DbContextOptions<GlucoseContext> options)
       : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            this.ConfigureRelations(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }
        private void ConfigureRelations(ModelBuilder modelBuilder)
        {
            //// Gyereknek van egy edzője egy edzőnek több gyereke is van
            //// Törlésnél a gyerek CoachId-ja null lesz
            //modelBuilder.Entity<User>()
            //        .HasQueryFilter(x => x.Deleted == false)
            //        .HasMany(mc => mc.Students)
            //        .WithOne(s => s.Coach)
            //        .HasForeignKey(s => s.CoachId)
            //        .OnDelete(DeleteBehavior.SetNull);
           

        }
        public override int SaveChanges()
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Deleted);

            foreach (var entry in entries)
            {
                entry.State = EntityState.Modified;
                ((BaseEntity)entry.Entity).Deleted = true;
            }

            return base.SaveChanges();
        }
        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var entries = ChangeTracker.Entries()
                .Where(e => e.State == EntityState.Deleted);

            foreach (var entry in entries)
            {
                entry.State = EntityState.Modified;
                ((BaseEntity)entry.Entity).Deleted = true;
            }

            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}
