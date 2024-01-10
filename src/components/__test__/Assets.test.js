import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CurrentUserProvider } from "../../context/CurrentUserContext";
import Assets from '../Asset'

describe('assets', () => {

    const expectedRenderComponent = (
        <body>
        <div>
          <div
            class="Asset p-4"
          />
        </div>
      </body>
    )

    test('renders the assets component', () => {
      const renderComponent = () => render(<Assets />);
      const renderAssets = renderComponent();
      expect(renderAssets.findByText("Asset")).toBeTruthy()

    });

    // test('renders avatar component prop text if define ', () => {
        
    //     const renderComponent = () => render(<Avatar text="test" />);
        
    //     const renderAvatar = renderComponent();
    //     const screenHasTest = screen.getByText("test");
        
    //     expect(renderAvatar.getByText('test')).toBeInTheDocument();
    //     expect(screenHasTest).toBeInTheDocument();
    //   });
  });