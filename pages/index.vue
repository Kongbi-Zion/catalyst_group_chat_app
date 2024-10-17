<template>
  <div class="w-full h-full bg-deeper">
    <div
      class="font-[sans-serif] bg-deeper max-w-4xl flex items-center mx-auto md:h-screen p-4"
    >
      <div
        class="grid md:grid-cols-3 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden"
      >
        <div
          class="max-md:order-1 flex flex-col justify-center space-y-16 max-md:mt-16 min-h-full bg-gradient-to-r from-violet-900 to-violet-700 lg:px-8 px-4 py-4"
        >
          <div>
            <h4 class="text-white text-lg font-semibold">
              Create Your Account
            </h4>
            <p class="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Welcome to our registration page! Get started by creating your
              account.
            </p>
          </div>
          <div>
            <h4 class="text-white text-lg font-semibold">
              Simple & Secure Registration
            </h4>
            <p class="text-[13px] text-gray-300 mt-3 leading-relaxed">
              Our registration process is designed to be straightforward and
              secure. We prioritize your privacy and data security.
            </p>
          </div>
        </div>

        <Form
          v-slot="{ errors }"
          :initial-values="initialValues"
          :validation-schema="schema"
          @submit="handleSubmit"
          class="md:col-span-2 w-full py-6 px-6 sm:px-16 bg-deep"
        >
          <div class="mb-6 md:mb-4">
            <h3 class="text-gray-300 text-2xl font-bold">Create an account</h3>
          </div>

          <div class="space-y-6 md:space-y-4">
            <div>
              <label class="text-gray-300 text-sm mb-2 block">Username</label>
              <div class="relative flex items-center">
                <Field
                  name="username"
                  type="text"
                  class="text-gray-300 bg-deep border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-violet-600"
                  :class="errors.username && 'border-red-500'"
                  placeholder="Enter your username"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
              <p
                v-if="errors.username"
                class="mt-2 text-sm font-light text-red-500"
              >
                {{ errors.username }}
              </p>
            </div>

            <div>
              <label class="text-gray-300 text-sm mb-2 block">Email</label>
              <div class="relative flex items-center">
                <Field
                  name="email"
                  type="email"
                  class="text-gray-300 bg-deep border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-violet-600"
                  :class="errors.email && 'border-red-500'"
                  placeholder="Enter your email"
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="w-4 h-4 absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
              <p
                v-if="errors.email"
                class="mt-2 text-sm font-light text-red-500"
              >
                {{ errors.email }}
              </p>
            </div>
          </div>

          <div class="mt-8">
            <button
              :disabled="pending"
              type="submit"
              class="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-violet-700 hover:bg-violet-800 focus:outline-none"
            >
              <span v-if="pending">Please wait...</span>
              <span v-else>Create an account</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, Field, configure } from "vee-validate";
import { type CreateUserInput } from "~/src/types/amplify";
import * as yup from "yup";
const store = useAuthStore();

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const pending = ref(false);
const initialValues: CreateUserInput = {
  username: "",
  email: "",
  profile_pic_url: "/profile.webp",
};
const schema = yup.object({
  username: yup.string().required("Required!"),
  email: yup.string().email("Not a valide email").required("Required!"),
  profile_pic_url: yup.string(),
});

onMounted(() => {
  if (process.client) {
    let user = localStorage.getItem("group_chat_user");
    if (user || user != null) {
      navigateTo("/dashboard");
    }
  }
});

const handleSubmit = async (inputs: any) => {
  pending.value = true;

  const { data, error } = await useAsyncData("user", () =>
    store.createUser(inputs).then((createUserResult) => {
      pending.value = false;
      if (createUserResult.success) {
        navigateTo("/dashboard");
      }
    })
  );
};
</script>
