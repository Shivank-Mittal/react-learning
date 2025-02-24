import { screen, render } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Card from '../../../project/memory-game/Card';
import userEvent from '@testing-library/user-event';

describe('Card', () => {
  test('card should render', () => {
    const cardContainer = render(<Card flip={false}> test</Card>);
    expect(cardContainer.container).toBeInTheDocument();
  });

  test('should renders "?" when flip prop is true', () => {
    render(<Card flip={false}> test</Card>);

    const cardElement = screen.getByRole('card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveTextContent('?');
    expect(cardElement).not.toHaveTextContent('test');
  });

  test('should render children when flip prop is true', () => {
    render(<Card flip={true}> test</Card>);

    const cardElement = screen.getByRole('card');
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toHaveTextContent('test');
    expect(cardElement).not.toHaveTextContent('?');
  });

  test('should dispatch an custom event "cardClick" with the props', async () => {
    const event = userEvent.setup();
    const dataSet = 'test-data-set';
    render(
      <Card flip={true} data-test={dataSet}>
        {' '}
        test
      </Card>
    );

    const cardElement = screen.getByRole('card');
    const mockEventListener = vi.fn();

    cardElement.addEventListener('cardClick', mockEventListener);
    await event.click(cardElement);

    expect(mockEventListener).toHaveBeenCalledTimes(1);
    const [mockEvent] = mockEventListener.mock.calls[0];
    expect(mockEvent.type).toBe('cardClick');
    expect((mockEvent.target as HTMLDivElement).dataset.test).toBe(dataSet);
  });

  //   test('should not dispatch onClick event out of the card', async () => {
  //     const event = userEvent.setup();
  //     const dataSet = "test-data-set";
  //     const mockClickHandler = vi.fn();

  //     render(
  //       <Card flip={true} data-test={dataSet} onClick={mockClickHandler} >
  //         {' '}
  //         test
  //       </Card>
  //     );
  //   });
});
