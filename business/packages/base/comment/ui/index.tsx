import type { ChangeEvent } from 'react';
import './index.scss';

type Props = {
	comment: string;
	handleChangeComment: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	commentCount: number;
};

export const Comment = ({
	comment,
	commentCount,
	handleChangeComment,
}: Props) => {
	return (
		<div className="flex flex__column comment">
			<h5 className="base-bold font-color-red text-ketchup">
				Lägg till en kommentar
			</h5>
			<p className="base-small">Viktig info till kollegorna</p>

			<label className="flex comment__label">
				<textarea
					rows={6}
					value={comment}
					maxLength={200}
					className="border-radius comment__textarea"
					onChange={handleChangeComment}
					placeholder="Glöm inte lägga till userComment också så personalen kan se det. Återstår att lösa backend så det faktiskt ändrar nåt mer än status. Verkar inte räkna tecken längre heller. Undrar vad jag tog bort. Klockan är 23 så jag ursäktar mig själv att det försvann"
				/>
			</label>
			<span className="base-small comment__max-characters">
				{commentCount} av 200 tecken
			</span>
		</div>
	);
};

/**
 * Author: Klara Sköld
 * Created a textarea for comments.
 *
 * Edited by: ninerino
 * Stripped down to what we need in business
 */
