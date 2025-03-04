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
exports.DispatcherController = void 0;
const common_1 = require("@nestjs/common");
const create_dispatcher_dto_1 = require("./dto/create.dispatcher.dto");
const dispatcher_service_1 = require("./dispatcher.service");
let DispatcherController = class DispatcherController {
    constructor(dispatcherService) {
        this.dispatcherService = dispatcherService;
    }
    async createCustomer(createDispatcherDto) {
        return this.dispatcherService.createDispatch(createDispatcherDto);
    }
    async getVehicleByCity(city) {
        return this.dispatcherService.getVehicleByCity(city);
    }
};
exports.DispatcherController = DispatcherController;
__decorate([
    (0, common_1.Post)('/dispatch-locations'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_dispatcher_dto_1.createDispatcherDto]),
    __metadata("design:returntype", Promise)
], DispatcherController.prototype, "createCustomer", null);
__decorate([
    (0, common_1.Get)('/dispatch-locations/:city'),
    __param(0, (0, common_1.Param)('city')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DispatcherController.prototype, "getVehicleByCity", null);
exports.DispatcherController = DispatcherController = __decorate([
    (0, common_1.Controller)('dispatcher'),
    __metadata("design:paramtypes", [dispatcher_service_1.DispatcherService])
], DispatcherController);
//# sourceMappingURL=dispatcher.controller.js.map