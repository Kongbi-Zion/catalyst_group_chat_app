// Dependencies ===============
import { createUserAccount } from "~/src/graphql/mutations";
import { generateClient } from "aws-amplify/api";
import { getUserAccount, getUsers } from "~/src/graphql/queries";
import type { User } from "~/src/types/types";
export const useAuthStore = defineStore("auth", () => {
  // State =====================
  const client = generateClient();
  const users = ref<any>([]);

  // Actions ====================
  const createUser = async (userInput: User) => {
    try {
      const result = await client.graphql({
        query: createUserAccount,
        variables: {
          userInput,
        },
      });

      localStorage.setItem(
        "group_chat_user",
        JSON.stringify(result.data.createUserAccount)
      );
      console.log(
        "result.data.createUserAccount",
        result.data.createUserAccount
      );

      return { success: true, user: result.data.createUserAccount };
    } catch (error) {
      console.log("result=====", error);
      return { success: false, error: error };
    }
  };

  const getUser = async (user_id: string) => {
    try {
      const group = await client.graphql({
        query: getUserAccount,
        variables: {
          user_id,
        },
      });
      return { success: true, result: group.data.getUserAccount };
    } catch (error) {
      return { success: false, result: error };
    }
  };

  const listUsers = async () => {
    // users.value = [];
    try {
      const result = await client.graphql({
        query: getUsers,
        variables: {},
      });
      users.value = result.data.getUsers.items;
      return { success: true, result: result.data.getUsers.items };
    } catch (error) {
      // console.log("data: ", error);
      return { success: false, result: error };
    }
  };
  const deleteAccount = async (value: any) => {
    console.log("values", value);
  };
  return {
    users,
    listUsers,
    getUser,
    createUser,
    deleteAccount,
  };
});
