import { renderElement } from '@cooperl/design-system/testing';
import { CommentsPageComponent } from './comments.component';

describe('[Farming Suite - Animal Sheet] CommentsPageComponent', () => {
  it('should instantiate', async () => {
    const { fixture } = await renderElement(CommentsPageComponent);

    expect(fixture.componentInstance).toBeInstanceOf(CommentsPageComponent);
  });
});
