﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using StationApp.Context;

namespace StationApp.Migrations
{
    [DbContext(typeof(StationsContext))]
    [Migration("20201228094208_floatTempMigration")]
    partial class floatTempMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("StationApp.Models.Station", b =>
                {
                    b.Property<int>("StationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("nvarchar(120)");

                    b.HasKey("StationId");

                    b.ToTable("Stations");
                });

            modelBuilder.Entity("StationApp.Models.StationTemperature", b =>
                {
                    b.Property<int>("TemperatureId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime>("Date")
                        .HasColumnType("Date");

                    b.Property<int>("StationId")
                        .HasColumnType("int");

                    b.Property<float>("Temperature")
                        .HasColumnType("real");

                    b.Property<long>("Time")
                        .HasColumnType("bigint");

                    b.HasKey("TemperatureId");

                    b.HasIndex("StationId");

                    b.ToTable("StationTemperature");
                });

            modelBuilder.Entity("StationApp.Models.StationTemperature", b =>
                {
                    b.HasOne("StationApp.Models.Station", "Station")
                        .WithMany("StationTemperature")
                        .HasForeignKey("StationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Station");
                });

            modelBuilder.Entity("StationApp.Models.Station", b =>
                {
                    b.Navigation("StationTemperature");
                });
#pragma warning restore 612, 618
        }
    }
}
