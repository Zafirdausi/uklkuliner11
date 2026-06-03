"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const menus_service_1 = require("./menus.service");
const menu_dto_1 = require("./dto/menu.dto");
const jwt_auth_guard_1 = require("../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../common/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let MenusController = class MenusController {
    constructor(menusService) {
        this.menusService = menusService;
    }
    findAll() {
        return this.menusService.findAll();
    }
    findAllAdmin() {
        return this.menusService.findAllAdmin();
    }
    findOne(id) {
        return this.menusService.findOne(id);
    }
    create(dto) {
        return this.menusService.create(dto);
    }
    update(id, dto) {
        return this.menusService.update(id, dto);
    }
    remove(id) {
        return this.menusService.remove(id);
    }
};
exports.MenusController = MenusController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available menus' }),
    (0, swagger_1.ApiOkResponse)({ description: 'List of menus returned successfully.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Get)('admin/all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all menus for admin' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Admin list of menus returned successfully.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Authentication required.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Admin role required.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a menu by ID' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Menu returned successfully.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Menu not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new menu item' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Menu item created successfully.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid menu data.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Authentication required.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Admin role required.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [menu_dto_1.CreateMenuDto]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing menu item' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Menu item updated successfully.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid menu data.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Authentication required.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Admin role required.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Menu not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, menu_dto_1.UpdateMenuDto]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a menu item' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Menu item deleted successfully.' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Authentication required.' }),
    (0, swagger_1.ApiForbiddenResponse)({ description: 'Admin role required.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Menu not found.' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MenusController.prototype, "remove", null);
exports.MenusController = MenusController = __decorate([
    (0, swagger_1.ApiTags)('Menus'),
    (0, common_1.Controller)('menus'),
    __metadata("design:paramtypes", [menus_service_1.MenusService])
], MenusController);
//# sourceMappingURL=menus.controller.js.map