// action에는 type 필드가 반드시 존재해야 한다.
{ type: "ADD_COLOR" }

// 문자열로 type을 지정하는 대신 constants 모듈을 통해 action type을 입력한다.
import C from "./constants"

{ type: C.ADD_COLOR }
