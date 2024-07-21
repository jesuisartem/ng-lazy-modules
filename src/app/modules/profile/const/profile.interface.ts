import {FormControl} from "@angular/forms";

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  url?: string;
  location?: string;
}

interface ProfileFormModel {
  first_name: FormControl<Profile['first_name']>;
  last_name: FormControl<Profile['last_name']>;
  email: FormControl<Profile['email']>;
  phone_number: FormControl<Profile['phone_number']>;
  url: FormControl<Profile['url']>;
}

export {
  Profile,
  ProfileFormModel,
}
