import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiOkResponse, ApiForbiddenResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { GetUser } from '../common/decorators/get-user.decorator';
import { Role } from '@prisma/client';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiOkResponse({ description: 'Authenticated user profile returned successfully.' })
  @ApiUnauthorizedResponse({ description: 'Authentication credentials were missing or invalid.' })
  getProfile(@GetUser('id') userId: number) {
    return this.usersService.getProfile(userId);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Get all users (admin only)' })
  @ApiOkResponse({ description: 'List of users returned successfully.' })
  @ApiForbiddenResponse({ description: 'Admin role required to access this endpoint.' })
  findAll() {
    return this.usersService.findAll();
  }
}
