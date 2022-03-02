import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    AdminModule,
    CommentsModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://rottentomatoes:rottentomatoes@cluster0.5a8na.mongodb.net/rottentomatoes',
      {
        useNewUrlParser: true
      }
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
