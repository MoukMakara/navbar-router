import { useLocation } from "react-router-dom";
import SportClubDeatailCard from "../../components/cards/SportClubDeatailCard";

export default function SportClubDetail() {
  const location = useLocation();
  const sportClub = location.state;
  console.log("location: ", location);
  return (
    <section className="flex justify-center items-center">
      <SportClubDeatailCard
        image={sportClub.image}
        sport_name={sportClub.sport_name}
        description={sportClub.description}
        price={sportClub.price}
        first_phone={sportClub.contact_info.first_phone}
        second_phone={sportClub.contact_info.second_phone}
        facebook={sportClub.contact_info.facebook}
        telegram={sportClub.contact_info.telegram}
        website={sportClub.contact_info.website}
      />
    </section>
  );
}
