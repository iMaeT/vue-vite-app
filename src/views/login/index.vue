<script lang="tsx">
import { defineComponent, ref, reactive, unref } from 'vue'
import type { LoginFormModule } from '@/@types'
import { useUserStoreExternal } from '@/store/modules/user'

export default defineComponent({
  name: 'Login',
  setup() {
    const userStore = useUserStoreExternal()
    const refForm = ref<Nullable<Element>>(null)
    const loading = ref<Boolean>(false)
    const form = reactive<LoginFormModule>({
      username: '',
      password: ''
    })
    const rules = reactive<AnyObj>({
      username: [{ required: true, message: '请输入账号' }],
      password: [{ required: true, message: '请输入密码' }]
    })

    const login = (): void => {
      const formWrap = unref(refForm) as any
      if (!formWrap) return
      formWrap.validate((valid: boolean) => {
        if (valid) {
          userStore.login(form)
        }
      })
    }

    return () => {
      return (
        <div class="login-wrap">
          <div class="login-con">
            <el-card class="box-card">
              {{
                header: () => <span class="login--header">Login</span>,
                default: () => (
                  <el-form ref={refForm} model={form} rules={rules} class="login-form">
                    <el-form-item prop="username">
                      <el-input
                        v-model={form.username}
                        placeholder="请输入账号 admin or test"
                        class="form--input"
                      >
                        {{
                          prefix: () => (
                            <span class="svg-container">
                              <svg-icon icon-class="user" />
                            </span>
                          )
                        }}
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input
                        v-model={form.password}
                        show-password={true}
                        minlength={3}
                        maxlength={18}
                        placeholder="请输入密码"
                        class="form--input"
                      >
                        {{
                          prefix: () => (
                            <span class="svg-container">
                              <svg-icon icon-class="password"></svg-icon>
                            </span>
                          )
                        }}
                      </el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        loading={loading.value}
                        type="primary"
                        class="login--button"
                        onClick={login}
                      >
                        登录
                      </el-button>
                    </el-form-item>
                  </el-form>
                )
              }}
            </el-card>
          </div>
        </div>
      )
    }
  }
})
</script>

<style scoped lang="less">
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/img/login-bg.jpg');
  background-position: center;
  background-size: cover;

  .box-card {
    width: 400px;

    .login--header {
      font-size: 24px;
      font-weight: 600;
    }

    .svg-container {
      display: inline-block;
      width: 30px;
      color: #889aa4;
      vertical-align: middle;
    }

    .form--input {
      width: 100%;

      :deep(.el-input__inner) {
        padding-left: 40px;
      }
    }

    .login--button {
      width: 100%;
    }
  }

  .login-con {
    position: absolute;
    top: 50%;
    right: 160px;
    transform: translateY(-60%);
  }
}
</style>
