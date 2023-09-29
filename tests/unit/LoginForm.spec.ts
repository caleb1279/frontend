import { shallowMount } from "@vue/test-utils";
import LoginForm from "@/components/LoginForm.vue";

describe("LoginForm.vue", () => {
  const wrapper = shallowMount(LoginForm);
  const username = wrapper.find("#username");
  const password = wrapper.find("#password");

  it("should render images correctly", () => {
    expect(wrapper.find("img").exists()).toBe(true);
  });

  it("should render correct contents", () => {
    expect(username.exists()).toBe(true);
    expect(password.exists()).toBe(true);
  });
});
