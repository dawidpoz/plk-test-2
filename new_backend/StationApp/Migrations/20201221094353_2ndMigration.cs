using Microsoft.EntityFrameworkCore.Migrations;

namespace StationApp.Migrations
{
    public partial class _2ndMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StationStationTemperature");

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

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "StationStationTemperature",
                columns: table => new
                {
                    StationId = table.Column<int>(type: "int", nullable: false),
                    TemperatureId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StationStationTemperature", x => new { x.StationId, x.TemperatureId });
                    table.ForeignKey(
                        name: "FK_StationStationTemperature_Stations_StationId",
                        column: x => x.StationId,
                        principalTable: "Stations",
                        principalColumn: "StationId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StationStationTemperature_StationTemperature_TemperatureId",
                        column: x => x.TemperatureId,
                        principalTable: "StationTemperature",
                        principalColumn: "TemperatureId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StationStationTemperature_TemperatureId",
                table: "StationStationTemperature",
                column: "TemperatureId");
        }
    }
}
