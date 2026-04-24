import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { createPostSchema, type PostScope } from '@morun/shared';
import { ZodValidationPipe } from '../common/zod.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Get()
  list(@Query('scope') scope: PostScope = 'public', @Query('crewId') crewId?: string) {
    return this.posts.list(scope, crewId);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @CurrentUser() user: { id: string },
    @Body(new ZodValidationPipe(createPostSchema)) body: unknown,
    @Query('crewId') crewId?: string,
  ) {
    return this.posts.create(user.id, body as any, crewId ?? null);
  }
}
