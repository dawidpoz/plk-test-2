using System.ComponentModel.DataAnnotations;

namespace StationApp.Dtos{
    public class LoginDto
    {       
        public string Login {set; get;}

        public string Password {set; get;}
    }
}