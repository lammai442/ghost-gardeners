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
		<div className="flex flex__column comment flex__gap-0">
			<p className="base-bold font-color-red text-ketchup">
				Lägg till en kommentar
			</p>
			<p className="base-small">Viktig info till kollegorna</p>
			{/* handleChangeComment counts the characters in the comment and commentCount displays the sum below the comment field.  */}
			<label className="flex comment__label">
				<textarea
					rows={6}
					value={comment}
					maxLength={200}
					className="border-radius comment__textarea"
					onChange={handleChangeComment}
					placeholder="Till exempel: superallergisk, rengör stekbord innan tillagning påbörjas"
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
 * Stripped down to what we need on the business side
 */
