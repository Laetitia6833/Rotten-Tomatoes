import { IsEmail, IsNotEmpty, Matches, ValidateBy, ValidateIf } from "class-validator";

export class AuthCredentialsDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    // @ValidateIf(element => element.password_confirmation === element.password)
    password_confirmation: string

    sessionId: string

    favourites: Array<any>
}

export class UpdateUserDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string
}

export class UserUpdateUserDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    password: string
}

export class AdminAddUserDto {
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsNotEmpty()
    password: string

    @IsNotEmpty()
    admin: boolean
}
