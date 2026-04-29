<?php
/**
 * The template for displaying the end of a section in the builder mode options
 *
 * This template can be overridden by copying it to yourtheme/tm-extra-product-options/tm-builder-section-end.php
 *
 * NOTE that we may need to update template files and you
 * (the plugin or theme developer) will need to copy the new files
 * to your theme or plugin to maintain compatibility.
 *
 * @author  ThemeComplete
 * @package Extra Product Options/Templates
 * @version 6.4
 */

defined( 'ABSPATH' ) || exit;

if ( ! isset( $style ) ) {
	$style = '';
}
echo '</div>';

if ( 'collapse' === $style || 'collapseclosed' === $style || 'accordion' === $style ) {
	echo '</div>';
}
if ( isset( $sections_type ) && 'popup' === $sections_type ) {
	echo '</div>';
}
if ( ! empty( $sections_repeater ) && empty( $sections_repeater_quantity ) ) {
	echo '<div class="tc-repeater-section-delete tc-hidden"><button type="button" class="tmicon tcfa tcfa-times delete"></button></div>';
}
echo '</div>'; // .tc-section-fields

if ( isset( $sections_repeater_name ) && isset( $sections_repeater ) && isset( $sections_repeater_key ) && $sections_repeater && $sections_repeater_key < count( $sections_repeater_name ) - 1 ) {
	return;
}

if ( ! empty( $sections_repeater ) ) {
	$srval = isset( $sections_repeater_posted_name ) && isset( $_REQUEST[ $sections_repeater_posted_name ] ) ? sanitize_text_field( wp_unslash( $_REQUEST[ $sections_repeater_posted_name ] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
	echo '<input type="hidden" class="sections_repeater" name="sections_repeater_' . esc_attr( str_replace( '.', '_', $uniqid ) ) . '" data-id="' . esc_attr( $uniqid ) . '" value="' . esc_attr( $srval ) . '">';
	if ( empty( $sections_repeater_quantity ) ) {
		echo ' <div class="tc-cell tcwidth tcwidth-100 tc-repeater-wrap">';
			echo '<button type="button" class="tc-section-repeater-add button">';
				echo ( '' !== $sections_repeater_button_label ) ? wp_kses_post( $sections_repeater_button_label ) : ( ! empty( THEMECOMPLETE_EPO_DATA_STORE()->get( 'tm_epo_add_button_text_repeater' ) ) ? wp_kses_post( THEMECOMPLETE_EPO_DATA_STORE()->get( 'tm_epo_add_button_text_repeater' ) ) : esc_html__( 'Add', 'woocommerce-tm-extra-product-options' ) ); // phpcs:ignore WordPress.Security.EscapeOutput
			echo '</button>';
		echo '</div>';
	}
}
echo '</div></div></div>';
