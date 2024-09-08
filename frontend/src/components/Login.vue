<template>
  <div class="base-container">
    <!-- 查询框居中对齐并设置固定尺寸 -->
    <div class="query-box">
      <!-- 在标题前面加图标 -->
      <div class="title-container">
        <el-icon><i class="el-icon-document"></i></el-icon>
        <h1 class="tracking-wide">后台日志查询</h1>
      </div>

      <!-- 表单部分 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { ElForm } from "element-plus";

interface RuleForm {
  username: string;
  password: string;
}

export default defineComponent({
  name: "LoginForm",
  setup() {
    // 表单数据
    const ruleForm = reactive<RuleForm>({
      username: "",
      password: ""
    });

    // 表单验证规则
    const rules = {
      username: [
        { required: true, message: "请输入用户名", trigger: "blur" }
      ],
      password: [
        { required: true, message: "请输入密码", trigger: "blur" }
      ]
    };

    // 表单引用
    const ruleFormRef = ref<InstanceType<typeof ElForm>>();

    // 提交表单方法
    const submitForm = () => {
      ruleFormRef.value?.validate((valid) => {
        if (valid) {
          // 发送登录请求
          console.log("登录成功", ruleForm);
          // 这里可以执行登录逻辑，例如发送 API 请求
        } else {
          console.log("表单验证失败");
          return false;
        }
      });
    };

    return {
      ruleForm,
      rules,
      ruleFormRef,
      submitForm
    };
  }
});
</script>

<style scoped>
.base-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.query-box {
  background-color: white;
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

.demo-ruleForm {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.el-form-item {
  margin-bottom: 15px;
}

.el-button {
  width: 100%;
}
</style>
