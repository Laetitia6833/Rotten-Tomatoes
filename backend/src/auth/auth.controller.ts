import { Body, Controller, Get, Post, UseGuards, Request, ValidationPipe, Param, Query, Redirect } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { LocalAuthGuard } from "./guards/local-auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    async register(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.register(authCredentialsDto)
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
        return this.authService.login(req.user)
    }

    // @Get('approved/:email')
    // // @Param('id')
    // @Redirect('http://localhost:3000')
    // async approved(@Param('email') email, @Query() query) {
    //     return this.authService.approved(email, query)
    // }

}
