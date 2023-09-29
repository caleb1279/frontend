import { shallowMount } from "@vue/test-utils";
import ErrorNotFound from "@/components/ErrorNotFound.vue";

describe("ErrorNotFound.vue", () => {
  const wrapper = shallowMount(ErrorNotFound);

  it("should render correct title", () => {
    const title = wrapper.find(".content h1");
    expect(title.exists()).toBe(true);
    expect(title.text()).toEqual("Error 404");
  });

  it("should render correct subtitle", () => {
    const subtitle = wrapper.find(".content h2");
    expect(subtitle.exists()).toBe(true);
  });
});
