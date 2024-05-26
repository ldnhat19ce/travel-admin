import { environment } from "../../../../environments/environment";

export class CommonConstant {
    static LOCAL_CURRENT_LANG = "Q4TZuMH2dqC42NTLCqjMg9uhHj4umn5l";
    static LOCAL_USER = "QvW5LbGE0XtTeD2vw3sPtyTPWQj4EVxu";

    static LIST_LANGUAGE = [
        { name: "Việt Nam", value: "vn" },
        { name: "English", value: "us" }
    ];

    static BASE_URL = environment.apiUrl;
}
