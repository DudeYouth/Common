'use strict';
let exec=require("child_process").exec;
exec("mkdir test",()=>{
	exec("mkdir test",{cwd:"./test"},()=>{
		console.log(456);
	})
})