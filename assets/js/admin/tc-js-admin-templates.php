<?php
/**
 * The admin javascript-based template for displayed javascript generated html code
 *
 * NOTE that this file is not meant to be overriden
 *
 * @see     https://codex.wordpress.org/Javascript_Reference/wp.template
 * @author  ThemeComplete
 * @package Extra Product Options/Templates
 * @version 6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<script class="tm-hidden" type="text/template" id="tmpl-tc-floatbox">
	<div class="header">
		<h3>{{{ data.title }}}</h3>
		<# if (data.uniqid){ #>
			<span data-uniqid="{{{ data.uniqid }}}" class="tm-element-uniqid">{{{ data.uniqidtext }}}{{{ data.uniqid }}}</span>
			<# } #>
	</div>
	<div id="{{{ data.id }}}" class="float-editbox">{{{ data.html }}}</div>
	<div class="footer">
		<div class="inner">
		<button type="button" class="tc tc-button floatbox-update">{{{ data.update }}}</button>
		<button type="button" class="tc-button floatbox-cancel">{{{ data.cancel }}}</button>
		</div>
	</div>
</script>
<script class="tm-hidden" type="text/template" id="tmpl-tc-floatbox-edit">
	<div class="header">
		<h3>{{{ data.title }}}</h3>
	</div>
	<div id="{{{ data.id }}}" class="float-editbox">{{{ data.html }}}</div>
	<div class="footer">
		<div class="inner">
			<button type="button" class="tc tc-button floatbox-edit-update">{{{ data.update }}}</button>
			<button type="button" class="tc-button floatbox-edit-cancel">{{{ data.cancel }}}</button>
		</div>
	</div>
</script>
<script class="tm-hidden" type="text/template" id="tmpl-tc-floatbox-import">
	<div class="header">
		<h3>{{{ data.title }}}</h3>
	</div>
	<div id="{{{ data.id }}}" class="float-editbox">{{{ data.html }}}</div>
	<div class="footer">
		<div class="inner">
			<button type="button" class="tc-button floatbox-cancel">{{{ data.cancel }}}</button>
		</div>
	</div>
</script>
<script class="tm-hidden" type="text/template" id="tmpl-tc-constant-template">
	<div class="constantrow">
		<div class="constant-name-container">
			<div class="constant-label-wrap constant-name-text{{{ data.labelnameclass }}}">
				<label for="constant-name{{{ data.id }}}">{{{ data.labelname }}}</label>
				<input id="constant-name{{{ data.id }}}" type="text" value="{{{ data.constantname }}}" class="constant-name">
			</div>
		</div>
		<div class="constant-value-container">
			<div class="constant-value-wrap">
				<div class="constant-label-wrap constant-value-text{{{ data.labelvalueclass }}}">
					<label for="constant-value{{{ data.id }}}">{{{ data.labelvalue }}}</label>
					<input id="constant-value{{{ data.id }}}" type="text" value="{{{ data.constantvalue }}}" class="constant-value">
				</div>
				<div class="constant-value-delete">
					<div class="tc-constant-delete">
						<button type="button" class="tmicon tcfa tcfa-times delete"></button>
					</div>
				</div>
			</div>
		</div>
		<div class="constant-add-container">
			<button type="button" class="tmicon tcfa tcfa-plus add tc-add-constant"></button>
		</div>
	</div>
</script>
<script class="tm-hidden" type="text/template" id="tmpl-tc-actions-menu">
	<div class="tc-actions-menu">
		<div class="context-menu-item" data-action="copy">
			<i class="tmicon tcfa tcfa-copy"></i>
			<span class="menu-text"><?php esc_html_e( 'Copy', 'woocommerce-tm-extra-product-options' ); ?></span>
			<span class="keybind">CTRL + C</span>
		</div>
		<div class="context-menu-item" data-action="paste">
			<i class="tmicon tcfa tcfa-paste"></i>
			<span class="menu-text"><?php esc_html_e( 'Paste', 'woocommerce-tm-extra-product-options' ); ?></span>
			<span class="keybind">CTRL + V</span>
		</div>
		<div class="context-menu-item separator"></div>
		<div class="context-menu-item" data-action="clone">
			<i class="tmicon tcfa tcfa-clone"></i>
			<span class="menu-text"><?php esc_html_e( 'Duplicate', 'woocommerce-tm-extra-product-options' ); ?></span>
			<span class="keybind">CTRL + D</span>
		</div>
		<div class="context-menu-item" data-action="edit">
			<i class="tmicon tcfa tcfa-edit"></i>
			<span class="menu-text"><?php esc_html_e( 'Edit', 'woocommerce-tm-extra-product-options' ); ?></span>
			<span class="keybind">CTRL + E</span>
		</div>
		<div class="context-menu-item separator"></div>
		<div class="context-menu-item" data-action="change">
			<i class="tmicon tcfa tcfa-exchange-alt"></i>
			<span class="menu-text"><?php esc_html_e( 'Change Element Type', 'woocommerce-tm-extra-product-options' ); ?></span>
		</div>
		<div class="context-menu-item" data-action="delete">
			<i class="tmicon tcfa tcfa-remove"></i>
			<span class="menu-text"><?php esc_html_e( 'Delete', 'woocommerce-tm-extra-product-options' ); ?></span>
			<span class="keybind">CTRL + DEL</span>
		</div>
	</div>
</script>
