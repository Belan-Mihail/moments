
import { render, screen } from "@testing-library/react";
import Avatar from '../Avatar';



describe('Avatar renders', () => {

    test('renders the avatar component', () => {
      const renderComponent = () => render(<Avatar />);
      const renderAvatar = renderComponent();
      const avatarImageAlt = screen.getByAltText('avatar')
      expect(avatarImageAlt).toBeInTheDocument();
      expect(renderAvatar).not.toBeNull();
    });

    test('renders avatar component prop text if define ', () => {
        
        const renderComponent = () => render(<Avatar text="test" />);
        
        const renderAvatar = renderComponent();
        const screenHasTest = screen.getByText("test");
        
        expect(renderAvatar.getByText('test')).toBeInTheDocument();
        expect(screenHasTest).toBeInTheDocument();
      });
  });