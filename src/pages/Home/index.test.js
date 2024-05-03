import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./index";
import {api, DataProvider } from "../../contexts/DataContext";

const data = {
  events: [
    {
      id: 1,
      type: "soirée entreprise",
      date: "2022-04-29T20:28:45.744Z",
      title: "Conférence #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "2 espaces de restaurations",
        "1 site web dédié",
      ],
    },

    {
      id: 2,
      type: "forum",
      date: "2022-04-29T20:28:45.744Z",
      title: "Forum #productCON",
      cover: "/images/stem-list-EVgsAbL51Rk-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: ["1 espace d’exposition", "1 scéne principale"],
    },
  ],
  focus: [
    {
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-02-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Gaming Day",
      description: "Evenement mondial autour du gaming",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      title: "World Farming Day",
      description: "Evenement mondial autour de la ferme",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
  ]
};

describe("When Form is created", () => {
  it("a list of fields is displayed", async () => {
    render(<Home />);
    expect(await screen.findByText("Email")).toBeInTheDocument();
    expect(await screen.findByText("Nom")).toBeInTheDocument();
    expect(await screen.findByText("Prénom")).toBeInTheDocument();
    expect(await screen.findByText("Personel / Entreprise")).toBeInTheDocument();
    expect(await screen.findByText("Message")).toBeInTheDocument();
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await waitFor(() => screen.findByText("Message envoyé !"), { timeout: 3000 });
      expect(await screen.findByText("Merci pour votre message nous tâcherons de vous répondre dans les plus brefs délais")).toBeInTheDocument();
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    expect(await screen.findByText("Conférence #productCON")).toBeInTheDocument();

  })
  it("a list a people is displayed", async () => {
    render(<Home />);
    expect(await screen.findByText("Samira")).toBeInTheDocument();
    expect(await screen.findByText("Isabelle")).toBeInTheDocument();
    expect(await screen.findByText("CEO")).toBeInTheDocument();
  })
  it("a footer is displayed", async () => {
    render(<Home />);
    expect(await screen.findByText("Notre derniére prestation")).toBeInTheDocument();
    expect(await screen.findByText("Contactez-nous")).toBeInTheDocument();
    expect(await screen.findByText("45 avenue de la République, 75000 Paris")).toBeInTheDocument();
    expect(await screen.findByText("01 23 45 67 89")).toBeInTheDocument();
  })
  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );
    expect(await screen.findByText("World Gaming Day")).toBeInTheDocument();
  })
});
