<template>
  <div class="base-container">
    <!-- 查询框居中对齐并设置固定尺寸 -->
    <div class="query-box">
      <!-- 在标题前面加图标 -->
      <div class="title-container">
        <el-icon><i class="el-icon-document"></i></el-icon>
        <h1 class="tracking-wide">后台日志查询</h1>
      </div>
      <div class="form-container">
        <el-form :inline="true"  :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-input type="text" v-model="formInline.username" placeholder="账号" ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input type="password" v-model="formInline.password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button  type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login(){
        //make sure username OR password are not empty
        if(this.input.username != "" || this.input.password != ""){
          console.log("authenticated")
        }else{
          console.log("Username and Password can not be empty")
        }
      }

    }
  }
</script>

<style scoped>
.base-container {

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.query-box {
  background-color: rgb(224 242 254);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.title-container h1 {
  font-size: 1.5rem;
  margin-left: 10px;
}

.demo-form-inline {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.form-container{
}



</style>
