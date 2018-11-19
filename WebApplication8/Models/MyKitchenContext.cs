using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MyKitchen.Web.Models
{
    public partial class MyKitchenContext : DbContext
    {
        public MyKitchenContext()
        {
        }

        public MyKitchenContext(DbContextOptions<MyKitchenContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Customer> Customer { get; set; }
        public virtual DbSet<LookupAddon> LookupAddon { get; set; }
        public virtual DbSet<LookupItemCategory> LookupItemCategory { get; set; }
        public virtual DbSet<LookupItemSize> LookupItemSize { get; set; }
        public virtual DbSet<LookupRegion> LookupRegion { get; set; }
        public virtual DbSet<MenuItem> MenuItem { get; set; }
        public virtual DbSet<MenuItemAddon> MenuItemAddon { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderItem> OrderItem { get; set; }
        public virtual DbSet<OrderItemAddon> OrderItemAddon { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer("Data Source=MYPC\\SQLEXPRESS;Initial Catalog=MyKitchen;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.BirthDate).HasColumnType("date");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.LastName).HasMaxLength(50);

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.PostalCode).HasMaxLength(50);

                entity.HasOne(d => d.Region)
                    .WithMany(p => p.Customer)
                    .HasForeignKey(d => d.RegionId)
                    .HasConstraintName("FK_Customer_LookupRegion");
            });

            modelBuilder.Entity<LookupAddon>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<LookupItemCategory>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<LookupItemSize>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<LookupRegion>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<MenuItem>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(50);

                entity.Property(e => e.IconPath)
                    .HasColumnName("iconPath")
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Price).HasColumnType("decimal(18, 0)");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.MenuItem)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_MenuItems_ItemCategoryLookUp");
            });

            modelBuilder.Entity<MenuItemAddon>(entity =>
            {
                entity.HasOne(d => d.Addon)
                    .WithMany(p => p.MenuItemAddon)
                    .HasForeignKey(d => d.AddonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ItemAddon_AddonLookUp");

                entity.HasOne(d => d.MenuItem)
                    .WithMany(p => p.MenuItemAddon)
                    .HasForeignKey(d => d.MenuItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_ItemAddon_MenuItems");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.Comments).HasMaxLength(500);

                entity.Property(e => e.TimeStamp)
                    .HasColumnName("timeStamp")
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Orders_Customers");
            });

            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasOne(d => d.ItemSize)
                    .WithMany(p => p.OrderItem)
                    .HasForeignKey(d => d.ItemSizeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderItem_ItemSize");

                entity.HasOne(d => d.MenuItem)
                    .WithMany(p => p.OrderItem)
                    .HasForeignKey(d => d.MenuItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderItem_MenuItems");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderItem)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderItem_Orders");
            });

            modelBuilder.Entity<OrderItemAddon>(entity =>
            {
                entity.HasOne(d => d.Addon)
                    .WithMany(p => p.OrderItemAddon)
                    .HasForeignKey(d => d.AddonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderItemAddon_LookupAddon");

                entity.HasOne(d => d.ItemSize)
                    .WithMany(p => p.OrderItemAddon)
                    .HasForeignKey(d => d.ItemSizeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderItemAddon_LookupItemSize");

                entity.HasOne(d => d.OrderItem)
                    .WithMany(p => p.OrderItemAddon)
                    .HasForeignKey(d => d.OrderItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderItemAddon_OrderItem1");
            });
        }
    }
}
