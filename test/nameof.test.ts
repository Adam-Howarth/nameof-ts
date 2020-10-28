import { nameof } from "..";

interface FirstModel {
	prop1: string;
	prop2: string;
	secondModel: SecondModel;
}

interface SecondModel {
	prop3: string;
	prop4: string;
	thirdModel: ThirdModel;
}

interface ThirdModel {
	prop5: string;
	prop6: string;
}

describe("nameof", () => {
	it("parses prop", () => {
		const parsedName = nameof<FirstModel>(p => p.prop1);
		expect(parsedName).toBe("prop1");
	});

	describe("nested models", () => {
		it("parses nested props", () => {
			const parsedName = nameof<FirstModel>(p => p.secondModel.prop3);
			expect(parsedName).toBe("secondModel.prop3");
		});

		it("parses nested props with lastProp option", () => {
			const parsedName = nameof<FirstModel>(p => p.secondModel.prop3, { lastProp: true });
			expect(parsedName).toBe("prop3");
		});

		it("parses nested props with assertion operators", () => {
			const parsedName = nameof<FirstModel>(p => p.secondModel!.prop3);
			expect(parsedName).toBe("secondModel.prop3");
		});

		it("parses multiple nested props", () => {
			const parsedName = nameof<FirstModel>(p => p.secondModel.thirdModel.prop6);

			expect(parsedName)
				.toBe("secondModel.thirdModel.prop6");
		});

		it("parses multiple nested props with lastProp option", () => {
			const parsedName = nameof<FirstModel>(p => p.secondModel.thirdModel.prop6, { lastProp: true });

			expect(parsedName)
				.toBe("prop6");
		});
	})
});
