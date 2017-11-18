

-- 1. 使用 sms 数据库
use sms;


-- 2. 插入城市数据
db.cities.insert({cname: "上海市"});
db.cities.insert({cname: "北京市"});
db.cities.insert({cname: "天津市"});
db.cities.insert({cname: "重庆市"});
db.cities.insert({cname: "深圳市"});
db.cities.insert({cname: "广州市"});




-- 3. 插入专业名称数据
db.majors.insert({name:"前端与移动开发"});
db.majors.insert({name:"iOS开发"});
db.majors.insert({name:"Android开发"});
db.majors.insert({name:"JavaEE开发"});
db.majors.insert({name:"PHP开发"});
db.majors.insert({name:"全栈开发"});



-- 4. 插入学员数据
db.students.insert({sno: "2017050101", sname: "刘备", sgender: "男", sbirthday: "1995-05-02", sphone: "13786547905", saddr: "上海市", smajor: "前端与移动开发"});

db.students.insert({sno: "2017050102", sname: "张飞", sgender: "男", sbirthday: "1991-02-12", sphone: "17718399959", saddr: "北京市", smajor: "前端与移动开发"});

db.students.insert({sno: "2017050103", sname: "关羽", sgender: "男", sbirthday: "1985-07-01", sphone: "15611113799", saddr: "天津市", smajor: "前端与移动开发"});

db.students.insert({sno: "2017050104", sname: "曹操", sgender: "男", sbirthday: "1993-09-15", sphone: "13525541666", saddr: "重庆市", smajor: "iOS开发"});

db.students.insert({sno: "2017050105", sname: "大乔", sgender: "女", sbirthday: "1980-04-01", sphone: "18511011444", saddr: "广州市", smajor: "前端与移动开发"});

db.students.insert({sno: "2017050106", sname: "小乔", sgender: "女", sbirthday: "1995-06-03", sphone: "18513131323", saddr: "深圳市", smajor: "JavaEE开发"});

db.students.insert({sno: "2017050107", sname: "孙坚", sgender: "男", sbirthday: "1986-09-27", sphone: "13797022229", saddr: "上海市", smajor: "前端与移动开发"});

db.students.insert({sno: "2017050108", sname: "孙策", sgender: "男", sbirthday: "1995-05-22", sphone: "13798575777", saddr: "北京市", smajor: "前端与移动开发"});

db.students.insert({sno: "2017050109", sname: "诸葛亮", sgender: "男", sbirthday: "1990-12-01", sphone: "15810999933", saddr: "北京市", smajor: "前端与移动开发"});

db.students.insert({ sno: "2017050110", sname: "周瑜", sgender: "男", sbirthday: "1988-11-24", sphone: "13911172215", saddr: "重庆市", smajor: "前端与移动开发"});



--- 其他测试

db.students.insert({ sno: "20171009", sname: "周小瑜", sgender: "男", sbirthday: "1987-10-24", sphone: "13911172999", saddr: "上海市", smajor: "前端与移动开发"});



