import * as express from "express";
import { Get, Request, Response, Route, Security } from "tsoa";
import {
  ErrorResponseModel,
  UserResponseModel
} from "../../fixtures/testModel";

@Route("SecurityTest")
export class SecurityTestController {
  @Response<ErrorResponseModel>("default", "Unexpected error")
  @Security("api_key")
  @Get()
  public async GetWithApi(
    @Request() request: express.Request
  ): Promise<UserResponseModel> {
    return Promise.resolve(request.user);
  }
}
