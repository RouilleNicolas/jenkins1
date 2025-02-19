import { render } from "@testing-library/angular";
import { InformationComponent } from "./information.component";

describe('[Farming Suite - Animal Sheet] InformationComponent', () => {

  it('should instantiate', async () => {
    const { fixture } = await render(InformationComponent, {
      inputs: {
        title: 'Title',
        content: 'Content',
      },
    });

    expect(fixture.componentInstance).toBeInstanceOf(InformationComponent);
  });

  it('should throw an error if title is not provided', async () => {
    await expect(render(InformationComponent, {
      inputs: {
        content: 'Content',
      },
    })).rejects.toThrow('NG0950');
  });

  it('should throw an error if content is not provided', async () => {
    await expect(render(InformationComponent, {
      inputs: {
        title: 'Title',
      },
    })).rejects.toThrow('NG0950');
  });

  it('should display title', async () => {
    const { getByText } = await render(InformationComponent, {
      inputs: {
        title: 'This is a title',
        content: 'Content',
      },
    });

    expect(getByText('This is a title')).toBeVisible();
  });

  it('should display content', async () => {
    const { getByText } = await render(InformationComponent, {
      inputs: {
        title: 'Title',
        content: 'This is the content',
      },
    });

    expect(getByText('This is the content')).toBeVisible();
  });
});
