using Microsoft.EntityFrameworkCore.Migrations;

namespace StationApp.Migrations
{
    public partial class _3ndMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Stations_StationTemperature_StationTemperatureTemperatureId",
                table: "Stations");

            migrationBuilder.DropIndex(
                name: "IX_Stations_StationTemperatureTemperatureId",
                table: "Stations");

            migrationBuilder.DropColumn(
                name: "StationTemperatureTemperatureId",
                table: "Stations");

            migrationBuilder.CreateIndex(
                name: "IX_StationTemperature_StationId",
                table: "StationTemperature",
                column: "StationId");

            migrationBuilder.AddForeignKey(
                name: "FK_StationTemperature_Stations_StationId",
                table: "StationTemperature",
                column: "StationId",
                principalTable: "Stations",
                principalColumn: "StationId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StationTemperature_Stations_StationId",
                table: "StationTemperature");

            migrationBuilder.DropIndex(
                name: "IX_StationTemperature_StationId",
                table: "StationTemperature");

            migrationBuilder.AddColumn<int>(
                name: "StationTemperatureTemperatureId",
                table: "Stations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Stations_StationTemperatureTemperatureId",
                table: "Stations",
                column: "StationTemperatureTemperatureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Stations_StationTemperature_StationTemperatureTemperatureId",
                table: "Stations",
                column: "StationTemperatureTemperatureId",
                principalTable: "StationTemperature",
                principalColumn: "TemperatureId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
